import Image from "next/image";

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-40 bg-black">
      <Image
        src="/inventoryapp2.webp"
        alt="/inventoryapp2.webp"
        fill={true}
        style={{
          objectFit: "cover",
          opacity: "80%",
        }}
      />
    </div>
  );
};
