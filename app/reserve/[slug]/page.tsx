import NavBar from "../../components/NavBar";
import Header from "./components.tsx/Header";
import Form from "./components.tsx/Form";

export default function Reserve() {
  return (
    <div className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <Header />
            <Form />
          </div>
        </div>
      </main>
    </div>
  );
}
