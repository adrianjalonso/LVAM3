 export default function Conta() {
  return(
    <div className="flex flex-col justify-center items-center w-screen h-screen">
    <h1 className="text-2xl font-bold">Minha conta</h1>
    <div className="flex gap-3 justify-center items-center">
      <figure className="font-bold text-3xl">A</figure>
      <div className="border border-red-500 p-4">
        <h2>nome</h2>
        <p>email</p>
        <button>Editar perfil</button>
      </div>
    </div>
    <div>foto</div>
    <div>foto</div>
    </div>
  )
 }