import axios from "axios";
import { useEffect, useState } from "react";

function Assigment() {
	const [product, setProduct] = useState([]);
	const [name, setname] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [price, setPrice] = useState();

	const [nameEdit, setnameEdit] = useState("");
	const [descriptionEdit, setDescriptionEdit] = useState("");
	const [imageEdit, setImageEdit] = useState("");
	const [priceEdit, setPriceEdit] = useState();

	const handleName = (event) => {
		console.log(event);
		console.log(event.target.value);
		setname(event.target.value);
	};
	const handleDescription = (event) => {
		console.log(event);
		console.log(event.target.value);
		setDescription(event.target.value);
	};
	const handleImage = (event) => {
		console.log(event);
		console.log(event.target.value);
		setImage(event.target.value);
	};
	const handlePrice = (event) => {
		console.log(event);
		console.log(event.target.value);
		setPrice(event.target.value);
	};
	const handleSubmit = () => {
		axios({
			method: "post",
			url: "http://localhost:7777/product",
			data: {
				name: name,
				description: description,
				image: image,
				price: price,
			},
		})
			.then((response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const handleEdit = () => {
		window.confirm("Want to Edit?");
		axios({
			method: "put",
			url: `http://localhost:7777/product/c6671e7e0cde5cd9`,
			data: {
				name: nameEdit,
				image: imageEdit,
				description: descriptionEdit,
				price: priceEdit,
			},
		})
			.then((response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleNameEdit = (event) => {
		console.log(event);
		console.log(event.target.value);
		setnameEdit(event.target.value);
	};
	const handleDescriptionEdit = (event) => {
		console.log(event);
		console.log(event.target.value);
		setDescriptionEdit(event.target.value);
	};
	const handleImageEdit = (event) => {
		console.log(event);
		console.log(event.target.value);
		setImageEdit(event.target.value);
	};
	const handlePriceEdit = (event) => {
		console.log(event);
		console.log(event.target.value);
		setPriceEdit(event.target.value);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure want to delete?")) {
			// kalo klik ok
			axios({
				method: "post",
				url: `http://localhost:7777/product/delete/${id}`,
			})
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	useEffect(() => {
		// Promise
    setTimeout(() => {
      axios({
        method: "get",
        url: "http://localhost:7777/product",
      })
        .then(function (response) {
          console.log(response.data.data);
          setProduct(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
          alert("ada error, coba reload kembali");
        });
    }, 1000);
	}, []);

	return (
		<div className="App">
			<div>
				<form
					className="row g-3"
					onSubmit={handleSubmit}>
					<div className="col-md-6">
						<label
							For="inputName"
							className="form-label">
							Name Product
						</label>
						<input
							value={name}
							onChange={handleName}
							type="name"
							className="form-control"
							id="inputName"
						/>
					</div>
					<div className="col-md-6">
						<label
							For="inputImage"
							className="form-label">
							Image
						</label>
						<input
							value={image}
							onChange={handleImage}
							type="name"
							className="form-control"
							id="inputImage"
						/>
					</div>
					<div className="col-md-6">
						<label
							For="Description"
							className="form-label">
							Description
						</label>
						<textarea
							value={description}
							onChange={handleDescription}
							className="form-control"
							id="Description"
							rows="3"></textarea>
					</div>
					<div className="col-md-6">
						<label
							For="inputPrice"
							className="form-label">
							Price
						</label>
						<input
							value={price}
							onChange={handlePrice}
							type="number"
							className="form-control"
							id="inputPrice"
						/>
					</div>
					<div className="col-12">
						<button
							type="submit"
							className="btn btn-primary">
							Create
						</button>
					</div>
				</form>
				{product.map((Item) => {
					// console.log(Item);
					return (
						<div>
							<div
								className="card"
								style={{ width: "18rem" }}>
								<div className="card-body">
									<h5 className="card-title">{Item.name}</h5>
									<h6 className="card-subtitle mb-2 text-muted">{Item.image}</h6>
									<p className="card-text">{Item.description}</p>
									<p className="card-text">Rp.{Item.price}</p>
									<a href="#"
										className="card-link"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal">
										Edit
									</a>
									<a	href="#"
										className="card-link"
										onClick={() => handleDelete(Item.id)}>
										Delete
									</a>
								</div>
							</div>
							<div
								className="modal fade"
								id="exampleModal"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5
												className="modal-title"
												id="exampleModalLabel">
												Edit Barang
											</h5>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body">
											<form
												className="row g-3"
												onSubmit={handleEdit}>
												<div className="col-md-6">
													<label
														For="inputName"
														className="form-label">
														Name Product
													</label>
													<input
														value={nameEdit}
														onChange={handleNameEdit}
														type="name"
														className="form-control"
														id="inputName"
													/>
												</div>
												<div className="col-md-6">
													<label
														For="inputImage"
														className="form-label">
														Image
													</label>
													<input
														value={imageEdit}
														onChange={handleImageEdit}
														type="name"
														className="form-control"
														id="inputImage"
													/>
												</div>
												<div className="col-md-6">
													<label
														For="Description"
														className="form-label">
														Description
													</label>
													<textarea
														value={descriptionEdit}
														onChange={handleDescriptionEdit}
														className="form-control"
														id="Description"
														rows="3"></textarea>
												</div>
												<div className="col-md-6">
													<label
														For="inputPrice"
														className="form-label">
														Price
													</label>
													<input
														value={priceEdit}
														onChange={handlePriceEdit}
														type="number"
														className="form-control"
														id="inputPrice"
													/>
												</div>
												<div className="col-12">
													<button
														type="submit"
														className="btn btn-primary">
														Create
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div></div>
		</div>
	);
}

export default Assigment;
