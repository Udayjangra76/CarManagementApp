import React from 'react'

export default function Footer() {
    return (
        <footer class="bg-gray-200 py-2 px-4 shadow-md z-10 flex justify-content-center align-items-center dark:bg-slate-900 dark:text-white">
            <div class="text-sm text-gray-600 dark:text-gray-300">Copyright © 2024 Uday Jangra</div>
            <div class="flex ml-auto gap-4">
                <a href="#" class="text-gray-700 hover:text-gray-900 dark:text-gray-500 hover:dark:text-gray-700">Terms &
                    Conditions
                </a>
                <a href="#" class="text-gray-700 hover:text-gray-900 dark:text-gray-500 hover:dark:text-gray-700">Privacy
                    Policy
                </a>
            </div>
        </footer>
    )
}
