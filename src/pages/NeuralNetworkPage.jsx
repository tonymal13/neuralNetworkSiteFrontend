import React, { useState, useEffect } from 'react';
import '../styles/NeuralNetworkPage.css';
import image from '../assets/image.png';
import axios from "axios";

const ImageUploader = ({ selectedFile, onRemove, onChange }) => (
    <div className="inputFile">
        <input
            type="file"
            id="fileInput"
            className="input"
            onChange={onChange}
            accept=".jpg, .png"
        />
        {!selectedFile && (
            <label htmlFor="fileInput" className="inputLabel">
                Нажмите, чтобы загрузить
            </label>
        )}
        {selectedFile && (
            <div className="imageContainer">
                <img src={selectedFile} alt="Uploaded" className="image" />
                <button onClick={onRemove} className="removeButton">×</button>
            </div>
        )}
    </div>
);

const NeuralNetworkPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedImages, setGeneratedImages] = useState([]);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { files } = e.target;
        setSelectedFile(files[0]);
    };

    const onRemove = () => {
        setSelectedFile(null);
    };

    const generateImages = async () => {
        if (!selectedFile) {
            alert('Please upload an image.');
            return;
        }

        const url = 'http://192.168.219.24:8999/mp/BackroudReplace/?positive="on the grass in Central Park, gorgeous summer day with Bethesda fountain in the background, commercial footwear product photography"&negative="people, litter, trash, crowds, messy"';

        // Создаем FormData и добавляем файл
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            // Проверяем, успешно ли прошел запрос
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                alert(`Server error: ${response.status} - ${errorData}`);
                return;
            }

            const data = await response.json();

            // Проверяем, есть ли изображения в ответе
            if (!data.images || data.images.length === 0) {
                console.warn('No images received from the server response:', data);
                alert('No images received from the server.');
                return;
            }

            // Логируем изображения для отладки
            console.log('Images received from server:', data.images);

            // Конвертируем изображения в формат Base64 и обновляем состояние
            const imagesBase64 = data.images.map((img) => `data:image/png;base64,${img}`);
            setGeneratedImages(imagesBase64);

        } catch (error) {
            // Обработка ошибок сети и серверных ошибок
            console.error('Error during fetch:', error.message);
            alert(`Request error: ${error.message}`);
        }
    };


    useEffect(() => {
        return () => {
            if (selectedFile) URL.revokeObjectURL(selectedFile);
        };
    }, [selectedFile]);

    return (
        <div className="neuralNetworkPage">
            <div className="header">
                <p className="howTo">
                    Чтобы использовать наш продукт, загрузите фотографию вашего продукта (.jpg или .png), а затем опишите фон, который вы хотите увидеть вместо оригинала. Для достижения наилучших результатов следуйте общим рекомендациям в примерах ниже:
                </p>
                <ol>
                    <li>❌ <b>Не</b> описывайте ваш продукт в описании (например, черные кроссовки)</li>
                    <li>✅ <b>Описывайте</b> "основание" для вашего продукта (например, на столе)</li>
                    <li>✅ <b>Описывайте</b> сцену, которую хотите (например, в греческом коттедже)</li>
                    <li>✅ <b>Описывайте</b> стиль изображения (например, рекламная фотография продукта с видом сбоку)</li>
                    <li>🤔 При необходимости, опишите, чего хотите избежать 🙅‍♂️ в поле для отрицательных описаний</li>
                </ol>
            </div>

            <div className="neuralNetworkPage__wrapper">
                <ImageUploader
                    selectedFile={selectedFile ? URL.createObjectURL(selectedFile) : null}
                    onChange={handleInputChange}
                    onRemove={onRemove}
                />
            </div>

            <button onClick={generateImages} className="generateButton">Сгенерировать!</button>

            <div className="resultsContainer">
                <div className="results__wrapper">
                    <div className="results__title_main">Результаты</div>
                    <div className="results__title">Сгенерировано</div>
                    <div className="results__border"></div>
                </div>
                <div className="results__tab">
                    <div className="results__content">
                        {generatedImages.length > 0 ? (
                            generatedImages.map((imgSrc, idx) => (
                                <img key={idx} src={imgSrc} alt={`Generated ${idx}`} className="generatedImage" />
                            ))
                        ) : (
                            <img src={image} alt="Generated content" className="generatedImage" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetworkPage;
