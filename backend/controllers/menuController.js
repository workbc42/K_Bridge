const { pool } = require('../db/pool');
const { menuData } = require('../scripts/seed-menu');

const getAllMenuItems = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM menu_items ORDER BY category, id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMenuItem = async (req, res) => {
    const { name, thai_name, description, category, price, image_url, is_available } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO menu_items (name, thai_name, description, category, price, image_url, is_available)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [name, thai_name, description, category, price, image_url, is_available !== undefined ? is_available : true]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, thai_name, description, category, price, image_url, is_available } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE menu_items
       SET name = $1, thai_name = $2, description = $3, category = $4, price = $5, image_url = $6, is_available = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
            [name, thai_name, description, category, price, image_url, is_available, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const resetMenu = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Truncate table and reset sequence
        await client.query('TRUNCATE TABLE menu_items RESTART IDENTITY');

        // Insert default data
        for (const item of menuData) {
            await client.query(
                `INSERT INTO menu_items (name, thai_name, description, category, price)
         VALUES ($1, $2, $3, $4, $5)`,
                [item.name, item.thai, item.desc, item.category, item.price]
            );
        }

        await client.query('COMMIT');
        res.json({ message: 'Menu reset to default data' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
};

module.exports = {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetMenu
};
