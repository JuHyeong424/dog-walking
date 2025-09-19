import IntroduceComponent from "@/components/home/IntroduceComponent";
import MainFunctionComponent from "@/components/home/MainFunctionComponent";
import UsageMethodComponent from "@/components/home/UsageMethodComponent";
import WhyComponent from "@/components/home/WhyComponent";
import FreeButtonComponent from "@/components/home/FreeButtonComponent";
import FooterBar from "@/components/home/FooterBar";

export default function Home() {
  return (
    <div>
      <IntroduceComponent/>
      <MainFunctionComponent/>
      <div className="bg-gray-100">
        <UsageMethodComponent/>
        <div className="flex flex-row p-16 items-center justify-center gap-20">
          <WhyComponent/>
          <div
            className="w-120 h-80 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://readdy.ai/api/search-image?query=A%20modern%20smartphone%20displaying%20a%20dog%20walking%20app%20interface%20with%20colorful%20charts%20and%20maps%2C%20held%20by%20hands%20with%20a%20cute%20beagle%20sitting%20nearby%20on%20a%20wooden%20table%2C%20bright%20and%20clean%20indoor%20setting%20with%20natural%20lighting%2C%20professional%20product%20photography%20style&width=600&height=600&seq=about-img&orientation=squarish')"
            }}
          />
        </div>
      </div>
      <FreeButtonComponent/>
      <FooterBar/>
    </div>
  );
}
