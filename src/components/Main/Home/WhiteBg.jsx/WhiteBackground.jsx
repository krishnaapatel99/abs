import Info from "./Info";
import CheckList from "./CheckList";
import Footer from "./Footer";

export default function WhiteBackground() {
  return (
    <div
      id="white-background"
      className="bg-white -mt-[20px] stars"
    >
      <Info />

      <CheckList />

      <Footer />
    </div>
  );
}