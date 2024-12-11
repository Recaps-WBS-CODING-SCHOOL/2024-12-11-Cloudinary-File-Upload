const Preview = ({ image }) => {
    return (
        <figure className='mt-5'>
            <img
                src={image}
                alt='User submitted image preview'
                className='w-full max-w-md mx-auto rounded-lg'
            />
            <figcaption className='text-center mt-2'>
                Image location: {image}
            </figcaption>
        </figure>
    );
};

export default Preview;
