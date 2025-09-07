// Database operations helper functions
import pool from "./database"
import type { RowDataPacket, ResultSetHeader } from "mysql2"

// User operations
export async function createUser(name: string, mobile: string, password: string) {
  const [result] = await pool.execute<ResultSetHeader>("INSERT INTO users (name, mobile, password) VALUES (?, ?, ?)", [
    name,
    mobile,
    password,
  ])
  return result.insertId
}

export async function getUserByMobile(mobile: string) {
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM users WHERE mobile = ?", [mobile])
  return rows[0]
}

// Product operations
export async function getAllProducts() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC",
  )
  return rows
}

export async function createProduct(productData: any) {
  const { name, description, price, discount_price, stock, category, images, features, specifications } = productData

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO products (name, description, price, discount_price, stock, category, images, features, specifications) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      description,
      price,
      discount_price,
      stock,
      category,
      JSON.stringify(images),
      JSON.stringify(features),
      JSON.stringify(specifications),
    ],
  )
  return result.insertId
}

// Order operations
export async function createOrder(orderData: any) {
  const { user_id, order_number, total_amount, shipping_cost, payment_method, shipping_address, items } = orderData

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO orders (user_id, order_number, total_amount, shipping_cost, payment_method, shipping_address, items) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      order_number,
      total_amount,
      shipping_cost,
      payment_method,
      JSON.stringify(shipping_address),
      JSON.stringify(items),
    ],
  )
  return result.insertId
}

export async function updateOrderStatus(orderId: number, status: string) {
  await pool.execute("UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    status,
    orderId,
  ])
}
