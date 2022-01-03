import React from "react";
import Container from "./layouts/container";
import Navbar from "./layouts/navbar";

const Search = (props) => {
	return (
		<Container navbar={<Navbar biskuit={props.biskuit} />}>
			<h3>Cari</h3>
			<div>
				<form method="post">
					<div className="mb-3">
						<label class="form-label">NIK</label>
						<input
							type="text"
							className="form-control"
							name="nik"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Cari
					</button>
				</form>
			</div>
			<div className="mt-5">
				{props.data?.map((data) => {
					return (
						<div className="card">
							<div className="card-body">
								NIK: {data.nik} <br />
								Nama: {data.nama}<br />
								Alamat: {data.alamat}
							</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
};

export default Search;
