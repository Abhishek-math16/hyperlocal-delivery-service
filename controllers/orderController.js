const Order = require('../models/orderModel');
const DeliveryAssignmentService = require('../services/deliveryAssignmentService');

// --- NEW Controller to get all orders ---
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error("Get all orders failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Order creation failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Get order by ID failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const assignDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await DeliveryAssignmentService.assignDeliveryToOrder(orderId);
    res.status(200).json({
      success: true,
      message: `Successfully assigned delivery person ${updatedOrder.person_id} to order ${updatedOrder.order_id}.`,
      data: updatedOrder
    });
  } catch (error) {
    console.error("Delivery assignment failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }
    const updatedOrder = await Order.updateStatus(orderId, status);
    res.status(200).json({
      success: true,
      message: `Order ${orderId} status updated to ${status}.`,
      data: updatedOrder
    });
  } catch (error) {
    console.error("Order status update failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllOrders, createOrder, getOrder, assignDelivery, updateOrderStatus };
