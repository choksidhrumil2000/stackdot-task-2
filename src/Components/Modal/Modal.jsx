
export default function Modal({children,open,setOpenModel}){

    
    return (
        open?
        <div style={{
            position:'fixed',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            top:0,
            left:0,
            width:'100vw',
            height:'100vh',
            backgroundColor:'rgba(0,0,0,0.5)',
        }} onClick={()=>setOpenModel(false)}>
            {children}

        </div>:<></>
    )
}