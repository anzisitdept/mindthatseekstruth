import fs from 'fs';
import path from 'path';
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { IoIosOptions } from "react-icons/io";
import Link from "next/link";
import BookCard from '../components/BookCard';
import { collection, getDocs } from 'firebase/firestore';
import { app, db } from '../../lib/firebaseConfig';

// Helper function to read JSON file
const getAllBooks = async ()=>{
  try {
    const booksCollectionRef = collection(db, "books"); // Reference to the "books" collection
    const querySnapshot = await getDocs(booksCollectionRef); // Fetch documents
    const allBooks = querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data() 
    })); // Extract data and include document ID
    return allBooks; // Return or handle the books data as needed
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

export async function generateMetadata() {
  const title =
     ` Top break up cure, and psychological books of merhan dadbeh | Mind that seeks truth`

  return {
    title,
    description: "Looking for the best break up books that will help you stay in shape mentally after a break up? Check out Mehran Dadbeh's top picks and most reviewed to find the cure to your break up pains!",
  };
}

export default async function ProductsPage({ searchParams }) {
  let products = await getAllBooks();


  // Handle sorting based on query parameter
  const sortParam = searchParams.sort;
  if (sortParam === 'price') {
    products = products.sort((a, b) => a.price - b.price);
  } else if (sortParam === 'title') {
    products = products.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="md:px-6">
      <div className="px-6 flex w-full justify-between items-center">
        <h1 className="text-[3rem] text-left md:py-18 py-8">Products</h1>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex items-center gap-2 w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <IoIosOptions className="2xl" />
              <p className="md:block hidden">Filter & Sort</p>
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <Link href="?sort=title" className="block px-4 py-2 text-sm text-gray-700">
                  Sort by Title
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="?sort=price" className="block px-4 py-2 text-sm text-gray-700">
                  Sort by Price
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1 justify-items-center w-full px-4">
        {products.map((book) => (
          <BookCard
            bookImg={book.image_url}
            bookTitle={book.title}
            bookDescription={book.description}
            key={book.title}
            bookSlug={book.slug}
          />
        ))}
      </div>
    </div>
  );
}
