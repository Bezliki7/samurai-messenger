import preloader from "../../../assets/images/preloader.gif"

function Preloader() {
    return(
        <div>
            <img src={preloader} style={ {width: "250px"} }/>
        </div>)
}

export default Preloader