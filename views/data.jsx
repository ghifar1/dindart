import React from "react";
import Container from "./layouts/container";
import Navbar from "./layouts/navbar";
import { format } from "date-fns";

const Data = (props) => {
	console.log(props);
	return (
		<Container navbar={<Navbar biskuit={props.biskuit} />}>
			<div className="mt-3">
				<div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">NIK</th>
								<th scope="col">Nama</th>
								<th scope="col">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{props.dataPenduduk.map((data, idx) => {
								return (
									<tr>
										<th scope="row">{idx + 1}</th>
										<td>{data.nik}</td>
										<td>{data.nama}</td>
										<td>
											<div className="row">
												<div className="col-2">
													<a
														className="btn btn-info m-1"
														href={
															"/edit/" + data.id
														}
													>
														Edit
													</a>
												</div>
												<div className="col-2">
													<form
														action="/data/delete"
														method="post"
														className="m-1"
													>
														<input
															type="hidden"
															name="id"
															value={data.id}
														/>
														<button
															type="submit"
															className="btn btn-danger"
														>
															Hapus
														</button>
													</form>
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="card">
					<div className="card-header">
						{props.dataEdit ? "Edit Data" : "Tambah Data"}
					</div>
					<div className="card-body">
						<form
							method="post"
							action={props.dataEdit ? "/data" : ""}
						>
							{props.dataEdit ? (
								<input
									type={"hidden"}
									name="edit"
									value={props.dataEdit.id}
								/>
							) : (
								""
							)}
							<div className="mb-3">
								<label className="form-label">Nama</label>
								<input
									type="text"
									name="nama"
									className="form-control"
									value={props.dataEdit?.nama ?? ""}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">NIK</label>
								<input
									type="text"
									name="nik"
									className="form-control"
									value={props.dataEdit?.nik ?? ""}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Jenis kelamin
								</label>
								<select
									className="form-select"
									name="jenis_kelamin"
								>
									{props.dataEdit?.jenis_kelamin ? (
										<option
											value={
												props.dataEdit?.jenis_kelamin
											}
											selected
										>
											{props.dataEdit?.jenis_kelamin}
										</option>
									) : (
										""
									)}
									<option></option>
									<option value="Laki-Laki">Laki-Laki</option>
									<option value="Perempuan">Perempuan</option>
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Tanggal Lahir
								</label>
								<input
									type="date"
									name="tanggal_lahir"
									className="form-control"
									value={
										props.dataEdit?.tanggal_lahir
											? format(
													new Date(
														props.dataEdit?.tanggal_lahir
													),
													"yyyy-MM-dd"
											  )
											: ""
									}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Agama</label>
								<select className="form-select" name="agama">
									{props.dataEdit?.agama ? (
										<option
											value={props.dataEdit?.agama}
											selected
										>
											{props.dataEdit?.agama}
										</option>
									) : (
										""
									)}
									<option></option>
									<option value="Islam">Islam</option>
									<option value="Kristen">Kristen</option>
									<option value="Hindu">Hindu</option>
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">Pendidikan</label>
								<select
									className="form-select"
									name="pendidikan"
								>
									{props.dataEdit?.pendidikan ? (
										<option
											value={props.dataEdit?.pendidikan}
											selected
										>
											{props.dataEdit?.pendidikan}
										</option>
									) : (
										""
									)}
									<option></option>
									<option value="SLTA/SEDERAJAT">
										SLTA/SEDERAJAT
									</option>
									<option value="SLTP/SEDERAJAT">
										SLTP/SEDERAJAT
									</option>
									<option value="TAMAT/SEDERAJAT">
										TAMAT SD/SEDERAJAT
									</option>
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Jenis Pekerjaan
								</label>
								<input
									type="text"
									name="jenis_pekerjaan"
									className="form-control"
									value={
										props.dataEdit?.jenis_pekerjaan ?? ""
									}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Golongan Darah
								</label>
								<select
									className="form-select"
									name="golongan_darah"
								>
									{props.dataEdit?.golongan_darah ? (
										<option
											value={
												props.dataEdit?.golongan_darah
											}
											selected
										>
											{props.dataEdit?.golongan_darah}
										</option>
									) : (
										""
									)}
									<option></option>
									<option value="A">A</option>
									<option value="B">B</option>
									<option value="AB">AB</option>
									<option value="O">O</option>
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">Alamat</label>
								<textarea
									name="alamat"
									className="form-control"
									value={props.dataEdit?.alamat ?? ""}
								/>
							</div>
							<button className="btn btn-primary" type="submit">
								Simpan
							</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Data;
