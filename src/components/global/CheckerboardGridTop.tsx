import { motion } from 'framer-motion';

export interface CheckerboardItem {
  name: string;
  description: string;
  image: string;
  imageAlt?: string;
}

interface CheckerboardGridProps {
  items: CheckerboardItem[];
}

export default function CheckerboardGridTop({
  items,
}: CheckerboardGridProps) {
  return (
    <div className="grid grid-cols-1 w-full">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 w-full"
          >
            {/* Image Block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className={`relative w-full aspect-square md:aspect-auto md:min-h-[500px] lg:min-h-[750px] overflow-hidden order-1 ${isEven ? 'md:order-1' : 'md:order-2'
                }`}
            >
              <img
                src={item.image}
                alt={item.imageAlt || item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col justify-start bg-primary-light text-text px-8 py-24 md:px-16 lg:px-20 text-center md:text-left order-2 ${isEven ? 'md:order-2' : 'md:order-1'
                }`}
            >
              <h3 className={`text-[24px] mb-4 md:text-[32px]`}>
                {item.name}
              </h3>
              <p className="text-[13px] md:text-[14px] lg:text-[20px] leading-relaxed dm-sans max-w-[450px] mx-auto md:mx-0">
                {item.description}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}