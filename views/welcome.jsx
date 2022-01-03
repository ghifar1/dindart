import React from "react";
import Container from "./layouts/container";
import Navbar from "./layouts/navbar";

const Welcome = (props) => {
	const name = [
		{
			nama: "Bapak Aries",
			jabatan: "Ketua RT",
		},
		{
			nama: "Bapak Nino Ontos",
			jabatan: "Wakil RT",
		},
		{
			nama: "Bapak Sukaryo",
			jabatan: "Sekretaris dan Bendahara",
		},
	];

	return (
		<Container navbar={<Navbar biskuit={props.biskuit} />}>
			<div>
				<h3>Struktur</h3>
				<div className="row">
					{name.map((data) => {
						return (
							<div className="col">
								<div
									className="card"
									style={{ width: "18rem" }}
								>
									<image
										src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
										className="card-img-top"
										alt="..."
									/>
									<div className="card-body">
										<h5 className="card-title">
											{data.nama}
										</h5>
										<p className="card-text">
											{data.jabatan}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Container>
	);
};

export default Welcome;
