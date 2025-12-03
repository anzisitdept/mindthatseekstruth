import ProductPageUi from '../../components/ProductPageUi';
import Image from 'next/image';
import { getProductData } from '../../components/getProductData';

// Server component for the product detail page
export default async function ProductDetailPage({ params }) {
  const { slug } = params;
  const productData = await getProductData(slug);
  if (!productData) {
    return (
      <div className="py-10">
        <h1>Product Not Found</h1>
      </div>
    );
  }

  const { title, description, price, image } = productData;

  return (
    <>
    <main className="flex justify-evenly w-full md:flex-row flex-col relative h-full">
            <div className="md:px-8 px-4 md:w-1/2 w-full md:block md:max-w-[40rem]">
              {/* Active Image Display */}
              <div className="activeImg relative w-full aspect-square">
                  <Image
                    src={productData.image_url}
                    alt="Break up cure | Mind that seeks truth"
                    className={`w-full aspect-square rounded-md skeleton-loading absolute transition-opacity duration-300`}
                    width={720}
                    height={720}
                    priority={true}
                  />
                
              </div>
        

            </div>
          <ProductPageUi parsedProduct={JSON.stringify(productData)}/>

          
      </main>

          <div className='md:px-8 px-4'>
            <h3 className='font-bold '>
              Description
            </h3>
            {(productData.oldSiteDesc ? productData.oldSiteDesc : productData.description)
  .split('.')
  .map((line, index) => (
    <p key={index} className="text-gray-800 py-2">{line}.</p>
  ))}

          </div>
    </>
  );
}
