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
            
            /*blogItem.textContent = `${blog.url ?? ""} - ${blog.muse ?? ""} - ${blog.status ?? ""}`;*/
            blogList.appendChild(blogItem);
        })

    }
    
    catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();
