/*async function loadBlogs() {
	const blogList = document.getElementById("blogList");
	if (!blogList) return;

	try {
		const scriptUrl = document.currentScript?.src || document.baseURI;
		const response = await fetch(new URL("list.json", scriptUrl));
		if (!response.ok) throw new Error(`Failed to load blogs: ${response.status}`);

		const blogs = await response.json();
		if (!Array.isArray(blogs)) throw new Error("list.json must contain an array");

		blogList.replaceChildren(
			...blogs.map((blog) => {
				if (!blog || typeof blog !== "object") return null;
				const item = document.createElement("li");
				item.textContent = `${blog.url ?? ""} - ${blog.muse ?? ""} - ${blog.status ?? ""}`;
				return item;
			})
		);
	} catch (error) {
		console.error("Could not load blogs", error);
		const item = document.createElement("li");
		item.textContent = "Could not load the blog list.";
		blogList.replaceChildren(item);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", loadBlogs);
} else {
	loadBlogs();
}
*/

const DATA_PATH = 'data.json';

async function fetchJsonData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const myJsonData = await response.json();
		
		const blogList = document.getElementById('links');

        myJsonData.blogs.forEach(blog => {
            if (blog.status === "hiatus") return;

            const blogItem = document.createElement('button');
	        blogItem.classList.add('button');

            const blogUrl = document.createElement('button-url');
            blogUrl.classList.add('button-url');
            blogUrl.textContent = `— @ ${blog.url ?? ""} —`;
            
	        blogItem.append(blogUrl);
            blogItem.appendChild(document.createElement('br'));

            const blogMuse = document.createElement('button-muse');
            blogMuse.classList.add('button-muse');
            blogMuse.textContent = `${blog.muse ?? ""}`;
	        blogItem.appendChild(blogMuse);
            blogItem.appendChild(document.createElement('br'));
            

	        /*blogItem.append(
	            document.createTextNode(blog.url ?? ""),
	            document.createElement("br"),
	            document.createTextNode("-"),
	            document.createElement("br"),
	            document.createTextNode(blog.muse ?? ""),
	            document.createElement("br"),
	            document.createTextNode("-"),
	            document.createElement("br"),
	            document.createTextNode(blog.status ?? "")
	        );*/
            /*blogItem.textContent = `${blog.url ?? ""} - ${blog.muse ?? ""} - ${blog.status ?? ""}`;*/
            blogList.appendChild(blogItem);
        })

    }
    
    catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();