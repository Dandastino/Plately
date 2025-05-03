import { useState } from "react"
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap"

const NewDishForm = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState("appetizer")
  const [photo, setPhoto] = useState("")
  const [allergies, setAllergies] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState({})

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
    } else if (parseFloat(price) < 0) {
      isValid = false
      newErrors.price = "Please enter a valid price (must be positive)"
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    if (!name || !type || !price) {
      setErrors({...errors,form: "Please fill out all required fields"})
      return
    }

    const dishData = {
      name, type,
      ...(photo && { photo }),
      ...(allergies && { allergies }),
      ...(description && { description }),
      prezzo: price ? parseFloat(price) : 0,
    }

    try {
      const response = await fetch("http://localhost:3000/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify(dishData),
      })

      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          errorMessage = "Failed to parse error response"
        }
        throw new Error(errorMessage)
      }

      let responseData
      try {
        responseData = await response.json()
      } catch (e) {
        responseData = { id: "success", message: "Dish added successfully" }
      }
      
      setResponse(responseData)
      console.log("Success response:", responseData)
      
      setName("")
      setType("appetizer")
      setPhoto("")
      setAllergies("")
      setDescription("")
      setPrice("")
      setErrors({})
    } catch (error) {
      setErrors({ form: error.message })
    }
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Add New Dish</h2>
      
      {response && (
        <Alert variant="success" dismissible onClose={() => setResponse(null)}>
          Dish added successfully! ID: {response.id}
        </Alert>
      )}
      
      {errors.form && (
        <Alert variant="danger" dismissible onClose={() => setErrors({...errors, form: ""})}>
          {errors.form}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name*</Form.Label>
              <Form.Control id="name" type="text" placeholder="Dish Name" value={name}onChange={(event) => setName(event.target.value)} isInvalid={!!errors.name} />
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
              <Form.Select id="allergies" value={allergies} onChange={(event) => setAllergies(event.target.value)}>
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
              <Form.Label htmlFor="price">Prezzo* (€)</Form.Label>
              <Form.Control id="price" type="number" step="0.10" placeholder="Dish Price" value={price} onChange={(event) => setPrice(event.target.value)} isInvalid={!!errors.price}/>
              <Form.Control.Feedback type="invalid"> {errors.price} </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        
        <Button variant="primary" type="submit" className="mt-3">Add Dish</Button>
      </Form>
    </Container>
  )
}

export default NewDishForm