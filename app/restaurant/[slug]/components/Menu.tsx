import { Item } from "@prisma/client";
import MenueCard from "./MenueCard";

export default function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => (
              <MenueCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>This restaurant doesn't provide menu</p>
        )}
      </div>
    </main>
  );
}
