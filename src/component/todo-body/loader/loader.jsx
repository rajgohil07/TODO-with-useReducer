import { Dna } from 'react-loader-spinner';
import style from './loader.module.css'

export const Loader = () => {
    return (
        <div className={style.loader}>
            <Dna
                visible={true}
                height="160"
                width="160"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}