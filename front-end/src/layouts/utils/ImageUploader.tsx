import { BsFillCloudUploadFill } from 'react-icons/bs'


type ImageUploaderProps = {
    selectedImage: File | null;
    handleImageUpload: (event: any) => void;
    ImageName: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    selectedImage,
    handleImageUpload,
    ImageName
}) => {
    return (
        <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
                Book Image
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-md border-2 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-700 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                        {selectedImage ? (
                            <>
                                <img
                                    src={selectedImage as any}
                                    alt="Selected Book"
                                    className="h-16 object-cover"
                                />
                                <p className="lowercase text-sm text-gray-400 pt-1 tracking-wider">
                                    {ImageName}
                                </p>
                            </>
                        ) : (
                            <>
                                <BsFillCloudUploadFill className="w-10 h-10 text-blue-400 group-hover:text-blue-600" />
                                <p className="lowercase text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider">
                                    Select a photo
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
        </div>
    )
}

export default ImageUploader