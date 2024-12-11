import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import Preview from './components/Preview';

const App = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        quote: '',
        image: null,
    });

    useEffect(() => {
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
    }, [error]);

    const handleChange = (e) =>
        setForm((prev) =>
            e.target.type === 'file'
                ? { ...prev, [e.target.name]: e.target.files[0] }
                : { ...prev, [e.target.name]: e.target.value }
        );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // For this to work, must add name="image" attribute to the file input.
            // Any other inputs would also need the name input
            const formData = new FormData();

            // console.log(Object.entries(form));

            Object.entries(form).forEach(([key, value]) =>
                formData.append(key, value)
            );
            console.log(formData);

            //Keep it DRY
            // formData.append('name', form.name);
            // formData.append('quote', form.quote);
            // formData.append('image', form.image);

            const res = await fetch('http://localhost:8080/file-upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error);
            }
            const data = await res.json();
            console.log(data);

            setImage(data.image);
            // e.target.reset();
            setForm({
                name: '',
                quote: '',
                image: null,
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto'>
            <h1 className='text-center text-2xl'>File upload</h1>
            <form
                className='mt-5 w-1/3 mx-auto flex flex-col items-center gap-5'
                onSubmit={handleSubmit}
            >
                <label className='input input-bordered flex items-center gap-2 w-full'>
                    Name:
                    <input
                        value={form.name}
                        onChange={handleChange}
                        type='text'
                        name='name'
                        className='grow'
                    />
                </label>
                <label className='input input-bordered flex items-center gap-2 w-full'>
                    Quote:
                    <input
                        value={form.quote}
                        onChange={handleChange}
                        type='text'
                        name='quote'
                        className='grow'
                    />
                </label>

                <input
                    onChange={handleChange}
                    name='image'
                    type='file'
                    className='file-input input-bordered w-full'
                />
                {error ? (
                    <Alert message={error} />
                ) : (
                    <button
                        type='submit'
                        className='btn btn-block'
                        disabled={loading}
                    >
                        Upload
                    </button>
                )}
            </form>
            {image && <Preview image={image} />}
        </div>
    );
};

export default App;
