import { MdExitToApp } from 'react-icons/md';
import { IconContext } from "react-icons";
import { timeGreeting } from '../../utils/timeGreeting';
import './styles.css';

export const HeaderProfile = () => (
    <div className='greeting'>
        <h2 id='text'>{timeGreeting()}, Usuário</h2>
        <div>
            <a id='exit_btn' href='/signIn'>
                <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <MdExitToApp />
                </IconContext.Provider>
            </a>
        </div>
    </div>
)