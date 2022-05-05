import style from "./LoaderStyle/Loader.module.css"

export const Loader = () => {
    <div className={style.loader}>
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"/>
                </div>
                <div class="gap-patch">
                    <div class="circle"/>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"/>
                </div>
            </div>
        </div>
    </div>
}