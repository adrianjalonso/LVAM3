export default function Footer({className}: {className: string}){
  return(
    <>
    <footer className={`${className} text-white text-sm flex justify-center items-center`}><p>Desenvolvido por <a className="underline" target="_blank" href="https://github.com/adrianjalonso">Adrián Alonso</a> © 2025</p></footer>
    </>
  )
}