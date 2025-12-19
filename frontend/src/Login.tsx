import { Link } from "react-router-dom";


function Login() {
  return (
    <> 
      <main className="flex justify-center items-center max-h-full bg-light pt-16 pb-6">
        <section className=" flex flex-col rounded-xl shadow-lg pt-4 p-8 w-full  max-w-md bg-white gap-4 mb-4">
          <div className="flex justify-evenly mb-6 ">
            <div className="flex justify-center items-center flex-col w-full">
              <p className="pt-2 pb-2 w-32 py-3 text-primary text-lg font-bold text-center">
                Entrar
              </p>
              <hr className=" border-primary w-full" />
            </div>
            <div className="flex justify-center items-center flex-col w-full">
              <p className="pt-2 pb-2 w-32 py-3 text-[#888888] text-center text-lg font-bold">
                Cadastrar-se
              </p>
              <hr className=" border-primary w-full hidden" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
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
                E-mail ou Nome de Usuário
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
          <Link
            to="/PaginaPrincipal"
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-gray-200 text-escuro text-base font-bold leading-normal hover:bg-gray-300 transition-colors"
          >
            Criar conta
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
        </section>
      </main>
    </>
  );
}

export default Login;
