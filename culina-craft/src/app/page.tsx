import Navbar from "@/components/navbar";
import RecipeCard from "@/components/card1"; // Pastikan path ini sesuai dengan lokasi file RecipeCard.tsx

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Container untuk Card */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <RecipeCard
          title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
          calories="300 cal"
          rating={4.5}
          imageUrl="/resep1.jpg" // Ganti dengan path gambar yang sesuai
        />
      </div>
    </div>
  );
}
