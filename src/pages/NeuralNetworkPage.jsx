import React, { useState, useEffect } from 'react';
import '../styles/NeuralNetworkPage.css';
import image from '../assets/image.png';

const ImageUploader = ({ selectedFile, onRemove, onChange }) => (
    <div className="inputFile">
        <input
            type="file"
            id='fileInput'
            className='input'
            onChange={onChange}
        />
        {!selectedFile && (
            <label htmlFor="fileInput" className='inputLabel'>
                Нажмите, чтобы загрузить
            </label>
        )}
        {selectedFile && (
            <div className='imageContainer'>
                <img src={selectedFile} alt="Uploaded" className='image' />
                <button onClick={onRemove} className='removeButton'>×</button>
            </div>
        )}
    </div>
);

const NeuralNetworkPage = () => {
    const [selectedFile, setSelectedFile] = useState();

    const handleInputChange = (e) => {
        e.preventDefault();
        const { files } = e.target;
        setSelectedFile(URL.createObjectURL(files[0]));
    };

    const onRemove = () => {
        URL.revokeObjectURL(selectedFile);
        setSelectedFile(null);
    };

    useEffect(() => {
        return () => {
            if (selectedFile) URL.revokeObjectURL(selectedFile);
        };
    }, [selectedFile]);

    return (
        <div className='neuralNetworkPage'>
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
                    selectedFile={selectedFile}
                    onChange={handleInputChange}
                    onRemove={onRemove}
                />
                <div className="prompts">
                    <div className="prompts__wrapper">
                        <div className="prompts__title">Подсказки</div>
                        <div className="prompts__border"></div>
                    </div>
                    <div className="prompts__tab">
                        <div className="prompts__description">
                            <div className="prompts__field">
                                <div className="prompts__label">Позитивное описание: опишите, что вы хотите увидеть</div>
                                <textarea className="prompts__input"></textarea>
                            </div>
                            <div className="divider"></div>
                            <div className="prompts__field">
                                <div className="prompts__label">Негативное описание: опишите, чего вы хотите избежать</div>
                                <textarea className="prompts__input"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="generateButton">Сгенерировать!</button>

            <div className="resultsContainer">
                <div className="results__wrapper">
                    <div className="results__title_main">Результаты</div>
                    <div className="results__title">Сгенерировано</div>
                    <div className="results__border"></div>
                </div>
                <div className="results__tab">
                    <div className="results__content">
                        <img src={image} alt="Generated content" className="generatedImage" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetworkPage;
