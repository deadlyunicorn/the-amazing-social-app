import "./loading.scss"

export const LoadingScreen = ({height}:{
    height:number //number in pixels

}) => {
    

    const Dot = ()=>(
        <div className="
            h-2 w-2 
            bg-white 
            rounded-md 
            drop-shadow-[0px_0px_4px_rgba(100,100,200,1)]"/>
    )
    
    return(
        <div 
            style={{height:height}}
            className={`
          relative 
          animation-loader 
          `}>

                <Dot/>
                <Dot/>
                <Dot/>
        </div>
    )
}
