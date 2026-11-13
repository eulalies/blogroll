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

            const blogItem = document.createElement('a');
            blogItem.href = blog.link + blog.url;
	        blogItem.classList.add('a');
            

            const blogUrl = document.createElement('button-url');
            blogUrl.classList.add('button-url');
            blogUrl.textContent = `— @ ${blog.url ?? ""} —`;
            
	        blogItem.append(blogUrl);
            blogItem.appendChild(document.createElement('br'));

            const blogMuse = document.createElement('button-muse');
            blogMuse.classList.add('button-muse');
            blogMuse.textContent = `${blog.muse ?? ""}`;
	        blogItem.appendChild(blogMuse);

			const blogStar = document.createElement('button-star')
			blogStar.classList.add('button-star');

			if (blog.status == "high")
				blogStar.textContent = '\xa0\xa0 ★\xa0\xa0 ';
            if (blog.status == "sporadic")
				blogStar.textContent = '\xa0\xa0 ⯪\xa0\xa0 ';
            if (blog.status == "hiatus")
				blogStar.textContent = '\xa0\xa0 ☆\xa0\xa0 ';
            blogItem.append(blogStar);


            const blogStat = document.createElement('button-stat')
			blogStat.classList.add('button-stat');
            if (blog.status != "hiatus")
                blogStat.textContent = `${blog.status ?? ""} activity`;
            else
                blogStat.textContent = `on ${blog.status ?? ""}`;
	        blogItem.appendChild(blogStat);
			
			
            blogItem.appendChild(document.createElement('br'));
            
            blogList.appendChild(blogItem);
        })

    }
    
    catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

fetchJsonData();
