import {
  bannerFive,
  bannerFour,
  bannerOne,
  bannerThree,
  bannerTwo,
} from "@/assets";
import ProductsList from "@/components/ProductsList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchData } from "@/hooks/fetchData";
import Image from "next/image";

const bannerImages = [
  { title: "bannerOne", source: bannerOne },
  { title: "bannerTwo", source: bannerTwo },
  { title: "bannerThree", source: bannerThree },
  { title: "bannerFour", source: bannerFour },
  { title: "bannerFive", source: bannerFive },
];
export default async function Home() {
  const endpoint = "https://dummyjson.com/products";
  const {products} = await fetchData(endpoint);
  console.log(products);
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {bannerImages?.map((item) => (
            <CarouselItem key={item?.title}>
              <Image
                src={item?.source}
                alt="bannerOne"
                className="w-full"
                height={1080}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-10 md:-mt-20 lg:-mt-60 items-center justify-center pb-10">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
