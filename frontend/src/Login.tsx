import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router-dom";
import { log } from "console";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function FormLogin(){
  return(
  <div>
            <div className="flex flex-col gap-3 ">
              <h1 className="text-3xl text-escuro text-text-main font-black leading-tight">
                Bem-vindo(a) de volta!
              </h1>
              <p className="text-base font-normal leading-normal">
                Junte-se a nós e fique por dentro das últimas tendências da moda.
              </p>
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  E-mail
                </p>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal"
                  placeholder="Digite seu e-mail ou nome de usuário"
                  type="text"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">Senha</p>
                <div className="flex flex-col ">
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal pr-2"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                  <div className=" flex w-8 justify-center items-center relative left-[350px] -top-7">
                    <i className=" text-gray-500 fa-solid fa-eye"></i>
                  </div>
                </div>
              </label>
            </div>
            <div className="flex justify-between items-center mt-2">
              <label className="flex gap-3 items-center">
                <input
                  className=" accent-primary rounded  focus:outline-none focus:ring-offset-0"
                  type="checkbox"
                />
                <p>Lembrar-me</p>
              </label>
              <a
                className="text-primary text-sm font-medium hover:underline"
                href="#"
              >
                Esqueceu a senha?
              </a>
            </div>
            <Link
              to="/PaginaPrincipal"
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal hover:bg-amber-800 transition-colors"
            >
              Entrar
            </Link>
            
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300 " />
              <span className="mx-4 text-sm text-text-secondary">ou</span>
              <hr className="flex-grow border-t border-gray-300 " />
            </div>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-3 w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200  transition-colors">
                <div className="size-6 text-center">
                  <i className="fa-brands fa-google text-primary"></i>
                </div>
                <span className="text-text-main  font-medium">
                  Entrar com Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-3 w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200  transition-colors">
                <div className="size-6 text-center">
                  <i className="fa-brands fa-facebook-f text-blue-600"></i>
                </div>
                <span className="text-text-main  font-medium">
                  Entrar com Facebook
                </span>
              </button>
            </div>
            <div>
              <p className="text-xs text-escuro">
                Ao continuar, você concorda com nossos{" "}
                <a className="text-primary hover:underline" href="#">
                  Termos de serviço
                </a>{" "}
                e
                <a className="text-primary hover:underline" href="#">
                  {" "}
                  Política de Privacidade
                </a>
                .{" "}
              </p>
            </div>
          </div>)
}

function FormCadastro( {isLogin,setIsLogin}: {isLogin:boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>}){

  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [errorSenha, setErrorSenha] = useState<string|null>(null)
  const [checkboxAcordo, setCheckboxAcordo] = useState("")

  async function cadastrar() {
    if(checkboxAcordo==="si"){
    if(senha!==confirmarSenha){
      setErrorSenha("As senhas não coincidem")
      return
    }
    setErrorSenha(null);

      const {data,error} = await supabase.from("usuarios").insert([{name: nome,email: email,senha_hash:senha}])
     if(error){
      setErrorSenha("Erro ao cadastrar usuário")
      console.log(error)
     } else {
      alert(`Cadastrado com sucesso! ${nome}`)
      setIsLogin(true)
     }} else {
      alert("Error")
     }
  }

  useEffect(()=>{
    if (confirmarSenha.length===0){
      setErrorSenha(null)
    } else if (senha!==confirmarSenha){
      setErrorSenha("As senhas não coincidem")
    } else {
      setErrorSenha(null)
    }
  },[senha, confirmarSenha])

 

  return(
    <div className="flex gap-2 flex-col">
     <div >
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Nome:</p>
       <input onChange={(e)=> setNome(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" type="text"/>
       </label>
     </div>
     <div >
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">E-mail:</p>
        <input onChange={(e)=> setEmail(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" autoComplete="email" type="email"/>
        </label>
     </div>
     <div>
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Senha:</p>
        <input onChange={(e)=> setSenha(e.target.value)} className="flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal" type="password"/>
        </label>
     </div>
     <div>
       <label className="flex flex-col">
        <p className="text-base font-medium leading-normal pb-2">Confirmar senha:</p>
        <input onChange={(e)=> setConfirmarSenha(e.target.value)} className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden border rounded-lg focus:outline-0 focus:border-primary h-14 p-3 text-base font-normal leading-normal ${errorSenha ? "border-red-500": "border-gray-300"}`} type="password"/>
        {errorSenha && (
      <span className="text-red-500 text-sm mt-1">
        {errorSenha}
      </span>
    )}
        </label>
     </div>
     <label className="flex flex-row-reverse justify-end gap-2">
      <p>Li e concordo com os termos</p>
      <input onChange={(e)=>setCheckboxAcordo(e.target.value)} className="accent-primary rounded  focus:outline-none focus:ring-offset-0" type="checkbox" value="si" />
      </label>
      <input onClick={cadastrar} type="submit" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal hover:bg-amber-800 transition-colors" value="Cadastrar" />
    </div>
  )
}



function Login({isLogin,setIsLogin}:{isLogin: boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>}) {
  const location = useLocation();
  const mensagemAlert = location.state?.message;
  const [abaLogin, setAbaLogin] = useState(true)


  return (
    <> 
      <main className="flex flex-col justify-center items-center max-h-full bg-light pt-16 pb-6">
        { mensagemAlert && <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded relative mb-4 text-center text-sm  font-medium animate-pulse">
            {mensagemAlert}
          </div>}
        <section className=" flex flex-col rounded-xl shadow-lg pt-4 p-8 w-full  max-w-md bg-white gap-4 mb-4">
          <div className="flex justify-evenly mb-6 transition-colors ">
            <div className="flex justify-center items-center flex-col w-full">
              <p onClick={()=> setAbaLogin(true)} className={` transition-all duration-300 ease-in-out pt-2 pb-2 w-32 py-3 ${abaLogin ? "text-primary": "text-[#888888]"} text-lg font-bold text-center`}>
                Entrar
              </p>
              <hr className={` border-primary w-full transition-all duration-300  ${abaLogin ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />
            </div>
            <div className="flex justify-center  items-center flex-col w-full">
              <p onClick={()=> setAbaLogin(false)} className={`pt-2 pb-2 w-32 py-3 ${abaLogin ? "text-[#888888]": "text-primary"} text-lg font-bold text-center`}>
                Cadastrar-se
              </p>
              <hr className={` border-primary w-full ${!abaLogin ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />
            </div>
          </div>
          {abaLogin ? <FormLogin />: <FormCadastro isLogin={isLogin} setIsLogin={setIsLogin} />}
        </section>
      </main>
    </>
  );
}

export default Login;
