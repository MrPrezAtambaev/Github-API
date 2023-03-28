import React, { useEffect, useState } from "react";
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebaunce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const Homepage = () => {
	const [seacrh, setSearch] = useState("");
	const [dropdown, setDropdown] = useState(false);
	const debaunced = useDebaunce(seacrh);
	const { isLoading, isError, data } = useSearchUsersQuery(debaunced, {
		skip: debaunced.length < 3,
		refetchOnFocus: true,
	});

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
		useLazyGetUserReposQuery();

	useEffect(() => {
		setDropdown(debaunced.length > 3 && data?.length! > 0);
	}, [debaunced, data]);

	const clickHandler = (username: string) => {
		fetchRepos(username);
		setDropdown(false);
	};

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			{isError && <p className="text-center text-red-600">Osihbka</p>}

			<div className="relative w-[560px]">
				<input
					type="text"
					className="border py-2 px-4 w-full h-[42px] mb-2"
					placeholder="Search for Github username"
					value={seacrh}
					onChange={(e) => setSearch(e.target.value)}
				/>

				{dropdown && (
					<ul className="list-none absolute top-[42px] left-0 right-0 h-[200px] overflow-y-scroll shadow-md bg-white">
						{isLoading && <p className="text-center">Loading...</p>}
						{data?.map((user) => (
							<li
								key={user.id}
								onClick={() => clickHandler(user.login)}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
							>
								{user.login}
							</li>
						))}
					</ul>
				)}
				<div className="container">
					{areReposLoading && <p className="text-center">Repos Is Loading</p>}
					{repos?.map((repo) => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Homepage;
