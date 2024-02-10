export const test = (req, res) => {
    res.json({ message: 'Api router is working' });
};

export const deleteUser = async (req, res) => {
    if (req.user.id !== req.params.id) return next(new Error('You can only delete your own account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};