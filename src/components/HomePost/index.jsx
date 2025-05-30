import { useState, useCallback, useEffect } from 'react';

import { Product } from '../Product';
import { HeaderHome } from '../HeaderHome';

import { products_firestore } from '../../utils/products_firestore';
import { app } from '../../utils/firebaseApp';

import './styless.css';
import { addDoc, collection, doc, getFirestore, Timestamp, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export const HomePost = ({ uid }) => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusText, setStatusText] = useState('Carregando produtos...')

  const handleLoadPosts = useCallback(async () => {
    const products = await products_firestore();
    console.log({ ...products });
    setPosts(products);
    setStatusText('Sem produtos nesse tipo =(')
  }, []);

  useEffect(() => {
    handleLoadPosts();
  }, [handleLoadPosts]);

  const handleChange = (value) => setSearchValue(value);

  const filteredPosts = searchValue
    ? posts.filter((post) => {
      return post.type.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;

  const requestMethod = async (title, price, amount, docUid) => {
    try{
      var error_type = 0
      const db = getFirestore(app);
      var addHist = await addDoc(collection(db, "history"), {
        productName: title,
        productPrice: price,
        purchaseDateTime: Timestamp.fromDate(new Date(Date.now())),
        userUid: uid,
        productUid: docUid
      });

      
      error_type = 1
      var toUpdateDoc = doc(db, "products", docUid);
      await updateDoc(toUpdateDoc, {
        amount: amount - 1
      });
      
      const docUser = doc(db, "users", uid);
      const docSnap = await getDoc(docUser);
      const spent = docSnap.data()['totalSpent']
      
      error_type = 2
      await updateDoc(docUser, {
        totalSpent: Math.round((spent + price) * 100) / 100
      });
      await handleLoadPosts();

      return -1
    }catch{
      if (error_type >= 1 && error_type !== 0){
        await deleteDoc(addHist)
      }

      if (error_type >= 2 && error_type !== 0){
        await updateDoc(toUpdateDoc, {
          amount: amount
        });
      }

      return error_type
    }
  }

  return (
    <section className='container-home'>
      <HeaderHome searchValue={searchValue} handleChange={handleChange} />
      <div className='container-posts'>
        {filteredPosts.length > 0 && <Product posts={filteredPosts}
          requestMethod={requestMethod} />}
        {filteredPosts.length === 0 && <h2 className='notFoundText'>{statusText}</h2>}
      </div>
    </section>
  );

}