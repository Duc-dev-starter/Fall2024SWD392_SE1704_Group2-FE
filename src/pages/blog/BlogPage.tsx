import React, { useEffect, useState } from 'react'
import { Banner, BlogCards, Pagination } from '@/components';
import { BaseService } from '@/services';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    useEffect(() => {
        fetchBlogs();
    }, [currentPage, pageSize, selectedCategory])
    async function fetchBlogs() {
        let url = `https://665b3286003609eda4602205.mockapi.io/blogs`
        const response = await BaseService.get({
            url,
        });
        if (selectedCategory) {
            url += `&category=${selectedCategory}`;
        }
        setBlogs(response.data);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category);
    }

    return (
        <>
            {/* Banner Section */}
            <Banner
                bgImage="../src/assets/6.png"
                titleKey="blog_title"
                descriptionKey="blog_description"
                buttonTextKey="login_button"
                showButton={true}
            />
            {/* Category Section */}
            <div></div>

            {/* BlogCards Section */}
            <div>
                <BlogCards blogs={blogs} currentPage={currentPage} selectedCategory={selectedCategory} pageSize={pageSize} />
            </div>

            {/* Pagination Section */}
            <div>
                <Pagination onPageChange={handlePageChange} blogs={blogs} pageSize={pageSize} />
            </div>
        </>
    )
}

export default BlogPage