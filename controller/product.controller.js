import generateResponseMessage from '../global/index.js';
import ProductModel from '../models/Product.js';
import ReviewModel from '../models/Review.js';

const product = {
    async getAllProducts(req, res) {
        const allProducts =
            await ProductModel.find()
                .populate('reviews')
                .exec()

        res.status(200).json(generateResponseMessage(200, null, allProducts));
    },
    async getProduct(req, res) {
        const product = await ProductModel.findById(req.params.id).populate('reviews').exec();
        res.status(200).json(generateResponseMessage(200, null, product));
    },
    async addComment(req, res) {
        const productId = req.params.id;
        const { userid } = req.headers;
        const { content } = req.body;
        const review = await ReviewModel({
            content,
            user: userid,
            product: productId,
        });
        await review.save();

        const product = await ProductModel.findById(productId);
        product.reviews.push(review);
        await product.save();

        //  you can update this way too
        // const product = await ProductModel.findById(productId);
        // await product.updateOne({ $push: { reviews: review}});

        res.status(200).json(generateResponseMessage(200, 'comment added', null));

        // https://stackoverflow.com/questions/65931572/node-js-mongoose-create-a-blog-post-commenting-system
    },
    async editComment(req, res) {
        const productId = req.params.id;
        const reviewId = req.params.reviewId;
        const { userid } = req.headers;
        const review = await ReviewModel.findByIdAndUpdate(reviewId, req.body);
        await review.save();

        res.status(200).json(generateResponseMessage(200, 'comment edited', null));
    },
    async deleteComment(req, res) {
        const productId = req.params.id;
        const reviewId = req.params.reviewId;
        const { userid } = req.headers;

        const product = await ProductModel.findByIdAndUpdate(
            productId,
            {
                $pull: { reviews: reviewId },
            },
            { new: true }
        );
        if (!product) {
            return res.status(404).json(generateResponseMessage(404, 'post not found', null));
        }

        await ReviewModel.findByIdAndDelete(reviewId);
        
        // https://stackoverflow.com/questions/61058347/how-to-delete-comment-from-post-on-node-express-and-mongoose-and-ajax

        res.status(200).json(generateResponseMessage(200, 'comment deleted', null));
    }
}

export default product; 