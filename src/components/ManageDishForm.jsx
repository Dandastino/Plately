import React from 'react'
import { Alert, Button, Form, Container, Row, Col, Table, Spinner, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"

const ManageDishForm = () => {
    // Form state
    const [name, setName] = useState("")
    const [type, setType] = useState("appetizer")
    const [photo, setPhoto] = useState("")
    const [allergies, setAllergies] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState({})
    
    // Dish management 
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentDishId, setCurrentDishId] = useState(null)

    // State per il modale di conferma eliminazione
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [dishToDelete, setDishToDelete] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    // Load all dishes 
    useEffect(() => {
        fetchDishes()
    }, [])

    // Generic API request handler
    const apiRequest = async (url, method = "GET", data = null) => {
        try {
            const options = {
                method,
                headers: data ? { "Content-Type": "application/json" } : undefined,
                body: data ? JSON.stringify(data) : undefined
            }

            const response = await fetch(url, options)
            
            if (!response.ok) {
                let errorMessage = `Server responded with status: ${response.status}`
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.message || errorMessage
                } catch (e) {
                    throw(e)
                }
                throw new Error(errorMessage)
            }
            
            if (method === "DELETE") {
                return { success: true }
            }
            
            try {
                return await response.json()
            } catch (e) {
                return { success: true }
            }
        } catch (error) {
            throw error
        }
    }

    // Fetch all dishes
    const fetchDishes = async () => {
        setLoading(true)
        try {
            const data = await apiRequest(`${API_URL}/dishes`)
            setDishes(data)
        } catch (error) {
            setErrors({ form: `Error fetching dishes: ${error.message}` })
        } finally {
            setLoading(false)
        }
    }

    // Fetch details of a specific dish
    const fetchDishDetails = async (dishId) => {
        setLoading(true)
        try {
            const dishToEdit = dishes.find(dish => dish.id === dishId)
            
            if (dishToEdit) {
                populateForm(dishToEdit)
            } else {
                const results = await apiRequest(`${API_URL}/dishes?id=eq.${dishId}`)
                const dishData = results[0]
                populateForm(dishData)
            }
    
            setEditMode(true)
            setCurrentDishId(dishId)
        } catch (error) {
            setErrors({ form: `Error fetching dish: ${error.message}` })
        } finally {
            setLoading(false)
        }
    }
    

    // Populate form with dish data
    const populateForm = (dishData) => {
        setName(dishData.name || "")
        setType(dishData.type || "appetizer")
        setPhoto(dishData.photo || "")
        setAllergies(dishData.allergies || "")
        setDescription(dishData.description || "")
        setPrice(dishData.prezzo?.toString() || "")
    }

    // delete confirm
    const handleDeleteClick = (dishId) => {
        setDishToDelete(dishId);
        setShowDeleteConfirmModal(true);
    };

    const confirmDeleteDish = async () => {
        if (!dishToDelete) return;
    
        setLoading(true);
        setShowDeleteConfirmModal(false); 

        try {
            await apiRequest(`${API_URL}/dishes?id=eq.${dishToDelete}`, "DELETE");
            setResponse({ id: dishToDelete, message: "Dish deleted successfully" });
            setDishToDelete(null); 
            fetchDishes(); 
        } catch (error) {
            setErrors({ form: `Error deleting dish: ${error.message}` });
            setDishToDelete(null); 
        } finally {
            setLoading(false);
        }
    };

    // delete dish
    const deleteDish = async (dishId) => {
        handleDeleteClick(dishId);
    }

    // Update the dish
    const handleSubmit = async (event) => {
        event.preventDefault()
    
        if (!validateForm()) return
    
        try {
            const dishData = {
                id: currentDishId,name, 
                type,
                ...(photo && { photo }),
                ...(allergies && { allergies }),
                ...(description && { description }),
                prezzo: price ? parseFloat(price) : 0,
            }
            
            await apiRequest(`${API_URL}/dishes?id=eq.${currentDishId}`, "PATCH", dishData)
            
            setResponse({id: currentDishId, message: "Dish updated successfully"})  
            setDishes(dishes.map(dish => dish.id === currentDishId ? {...dish, ...dishData} : dish))
            
            resetForm()
            fetchDishes()
        } catch (error) {
            setErrors({ form: error.message })
        }
    }

    // Check if the required fields are filled
    const validateForm = () => {
        let isValid = true
        const newErrors = {}
    
        if (!name.trim()) {
            isValid = false
            newErrors.name = "Name is required"
        }
    
        if (!type) {
            isValid = false
            newErrors.type = "Course type is required"
        }
    
        if (!price) {
            isValid = false
            newErrors.price = "Price is required"
        } else if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            isValid = false
            newErrors.price = "Please enter a valid price (must be positive)"
        }
    
        setErrors(newErrors)
        return isValid
    }

    // Reset after editing
    const resetForm = () => {
        setName("")
        setType("appetizer")
        setPhoto("")
        setAllergies("")
        setDescription("")
        setPrice("")
        setErrors({})
        setEditMode(false)
        setCurrentDishId(null)
    }
  
    return (
        <Container className="mt-4">
            <h2 className="mb-4">Manage Dishes</h2>
            
            {response && (<Alert variant="success" dismissible onClose={() => setResponse(null)}>{response.message || "Operation completed successfully!"}</Alert>)}
            
            {errors.form && (<Alert variant="danger" dismissible onClose={() => setErrors({...errors, form: ""})}>{errors.form}</Alert>)}
            
            <h3 className="mb-3">Dish List</h3>
            
            {loading ? (<div className="text-center"><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>
            ) : (
                <Table striped bordered hover responsive className="mb-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price (€)</th>
                            <th>Dietary Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.length > 0 ? (
                            dishes.map(dish => (
                                <tr key={dish.id}>
                                    <td>{dish.name}</td>
                                    <td>{dish.type}</td>
                                    <td>{dish.prezzo?.toFixed(2)}</td>
                                    <td>{dish.allergies || "None specified"}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => fetchDishDetails(dish.id)}className="me-2">Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => deleteDish(dish.id)}>Delete</Button>
                                    </td>
                                </tr>))
                        ) : (
                            <tr><td colSpan="5" className="text-center">No dishes available</td></tr>
                        )}
                    </tbody>
                </Table>
            )}
            
            {editMode ? (
                <>
                    <h3 className="mb-3">Edit Dish</h3>
                    
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="name">Name*</Form.Label>
                                    <Form.Control id="name" type="text" placeholder="Dish Name" value={name} onChange={(event) => setName(event.target.value)} isInvalid={!!errors.name} />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="type">Course*</Form.Label>
                                    <Form.Select id="type" value={type} onChange={(event) => setType(event.target.value)} isInvalid={!!errors.type}>
                                        <option value="appetizer">Appetizer</option>
                                        <option value="primo">First Course</option>
                                        <option value="secondo">Second Course</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="side">Side</option>
                                        <option value="drink">Drink</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="photo">Image URL</Form.Label>
                            <Form.Control id="photo" type="text" placeholder="Dish Image URL" value={photo} onChange={(event) => setPhoto(event.target.value)}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control id="description" as="textarea" rows={3} value={description} onChange={(event) => setDescription(event.target.value)}/>
                        </Form.Group>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="allergies">Dietary Info</Form.Label>
                                    <Form.Select 
                                        id="allergies" value={allergies} onChange={(event) => setAllergies(event.target.value)}>
                                        <option value="">None specified</option>
                                        <option value="fish">Sea Food</option>
                                        <option value="land">Land Animal</option>
                                        <option value="gluten free">Gluten Free</option>
                                        <option value="vegetarian">Vegetarian</option>
                                        <option value="vegan">Vegan</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="price">Price* (€)</Form.Label>
                                    <Form.Control id="price" type="number" step="0.10" placeholder="Dish Price" value={price} onChange={(event) => setPrice(event.target.value)} isInvalid={!!errors.price}/>
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <div className="mt-3">
                            <Button variant="primary" type="submit" className="me-2">Save Changes</Button>
                            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
                        </div>
                    </Form>
                </>
            ) : (
                <Alert variant="info" className="mt-3">Select a dish from the table above to edit its details.</Alert>
            )}

            <Modal show={showDeleteConfirmModal} onHide={() => setShowDeleteConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this dish? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteDish} disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ManageDishForm