import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const handleChange = (e) => {
		console.log(e.target.value);
		setQuery(e.target.value);
	}

	const onDeletePost = (id) => {
		const new_data = allPosts.filter(p => p.id !== id);
		setPosts(new_data);
	}

	const onCreatePost = post => {
		const new_post = { id: allPosts.length + 1, ...post}
		setPosts([ ...allPosts, new_post ]);
	}

	const filterPosts = () => {
		const result = query.length > 0 ? allPosts.filter(d => d.title.toLowerCase().includes(query.toLowerCase())) : allPosts;
		return result;
	}

	const PostList = () => {
		return <>
			{ filterPosts().length === 0 ? (
				<span className="message">{ 'No posts available...' }</span>
				) : (
				filterPosts().map((post, index) => <Post {...post} key={index} onDelete={onDeletePost} />)
			) }
			<CreatePost onCreate={onCreatePost} />
		</>
	}

	return (
		<>
			<div className="postList">
				{ loading ? <span className="message">{ 'Loading...' }</span> : <PostList /> }
			</div>
			<input placeholder="search" onChange={e => handleChange(e)} />
		</>
	)
};

export default Lister;