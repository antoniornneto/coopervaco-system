import SignUpForm from "@/components/form/SignUpForm";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { backgroundImage, logoCooperativaY } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="w-full">
      <title>Coopervaço - Cadastro de usuário</title>
      <Header />
      <div className="flex md:flex-col md:h-fit md:py-4 sm:h-[700px]">
        <div className="flex-1 md:hidden relative">
          <Image
            src={backgroundImage}
            width={0}
            height={0}
            alt="Imagem ilustrativa de pessoas trabalhando"
            className="h-full w-full"
          />
          <Image
            src={logoCooperativaY}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="w-[400px] absolute top-[35%] left-[25%] lg:w-[300px] lg:left-[20%]"
          />
        </div>
        <div className="flex flex-1 items-center justify-center md:flex-col">
          <Image
            src={logoCooperativaY}
            width={0}
            height={0}
            alt="logo da cooperativa"
            className="hidden md:w-72 md:block"
          />
          <div className="max-w-96 max-h-fit px-4 my-8">
            <Suspense>
              <SignUpForm />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default page;

// import SignUpForm from "@/components/form/SignUpForm";
// import Footer from "@/components/ui/footer";
// import Header from "@/components/ui/header";
// import { backgroundImage, logoCooperativaY } from "@/lib/utils";
// import Image from "next/image";
// import { Suspense } from "react";

// const Page = () => {
//   return (
//     <main className="w-full min-h-screen flex flex-col">
//       <title>Coopervaço - Cadastro de usuário</title>
//       <Header />
      
//       <div className="flex flex-1 h-screen md:flex-col md:h-auto md:py-4 sm:h-[700px]">
//         {/* Imagem e logo apenas em telas maiores */}
//         <div className="flex-1 relative hidden md:flex items-center justify-center">
//           <Image
//             src={backgroundImage}
//             layout="fill"
//             objectFit="cover"
//             alt="Imagem ilustrativa de pessoas trabalhando"
//             className="w-full h-full"
//           />
//           <Image
//             src={logoCooperativaY}
//             width={400}
//             height={400}
//             alt="Logo da cooperativa"
//             className="w-[400px] lg:w-[300px] absolute"
//           />
//         </div>

//         {/* Área do formulário */}
//         <div className="flex flex-1 items-center justify-center flex-col space-y-10 px-6">
//           <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
//             <Suspense fallback={<p>Carregando...</p>}>
//               <SignUpForm />
//             </Suspense>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </main>
//   );
// };

// export default Page;
