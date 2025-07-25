export default function ProductNode({ product,handleAddToCart }) {

    // const handleAddToCart = ()=>{

    // }
  return (
    <div
      className="card"
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
        margin: "10px 0px",
      }}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        width={"300px"}
        height={"300px"}
      />
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            lineHeight: "1.4em",
            wordBreak: "break-word",
            // height:'2.8rem',
            // minHeight:'1.4rem',
            minHeight: "calc(1.4em * 2)",
            // maxHeight: 'calc(1.4em * 2)',
          }}
        >
          {product.title}
        </h5>
        <p
          className="card-text"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            lineHeight: "1.4em",
            wordBreak: "break-word",
            // height:'2.8rem',
            // minHeight:'1.4rem',
            minHeight: "calc(1.4em * 2)",
            // maxHeight: 'calc(1.4em * 2)',
          }}
        >
          {product.description}
        </p>
      </div>
        <p style={{marginBottom:'10px'}}>${product.price}</p>
        <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
}
