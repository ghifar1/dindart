import React from "react";
import Container from "./layouts/container";
import Navbar from "./layouts/navbar";

const Home = (props) => {
	return (
		<Container navbar={<Navbar biskuit={props.biskuit} />}>
			<div className="mt-3">
				<h4>Selamat Datang</h4>
			</div>
		</Container>
	);
};

export default Home;
