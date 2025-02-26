interface ProductByIdProps {
    params: { id: string };
  }
  
  export default function ProductById({ params }: ProductByIdProps) {
    return <h1>Produto {params.id}</h1>;
  }