import { useEffect, useState } from "react"
import { MdNotifications } from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AxiosInstance from "../../api"
import { PrivateAxiosInstance } from "../../api/privateAxios"

interface Template {
    id: string,
    template: string
}


export const Homepage = () => {
    const [state, setState] = useState(false)
    const [sendEmail, setSendEmail] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [excelUpload, setExcelUpload] = useState(false)
    const [excelFile, setExcelFile] = useState<File | null>(null)
    const [selectedExcel, setSelectedExcel] = useState<File | null>(null)
    const [emailLog, setEmailLog] = useState(false)

    const [templates, setTemplates] = useState<Template[]>()



    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") || '{}')




    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedTemplate(null);
    };

    const handleTemplateSelection = (template: Template) => {
        setSelectedTemplate(template);
    };

    const fetchTemplates = async () => {
        const result = await AxiosInstance.get('/email-templates')
        console.log(result)
        setTemplates(result?.data?.data)
        setIsOpen(true)
    }

    const handleExcelUpload = async () => {
        const formData = new FormData()
        formData.append('file', selectedExcel as Blob)
        const response = await PrivateAxiosInstance.post(`/excel-upload?templateId=${selectedTemplate?.id}`,
            formData
        )
        if (response.data.success) {
            console.log(response.data.message)
            toast.success(response.data.message)
            setExcelUpload(false)
            setExcelFile(null)
            setSelectedExcel(null)
            closeModal()
        }
        else {
            console.log(response.data.message)
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        if (sendEmail) {
            fetchTemplates()
        }
    }, [sendEmail])

    return (
        <>

            <nav className="bg-white w-full border-b md:border-0 md:static">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className="flex items-center">
                            <div className="mr-2">
                                Welcome:
                            </div>
                            <div className="flex space-x-1">
                                <span >{user?.firstName}</span>
                                <span >{user?.middleName}</span>
                                <span>{user?.lastName}</span>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            {
                                <li className="text-gray-600 hover:text-indigo-600">
                                    <a onClick={() => setEmailLog(true)}>
                                        Email Log
                                    </a>
                                </li>
                            }
                            <li className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                                <a
                                    onClick={() => setSendEmail(true)}
                                >
                                    Send Email
                                </a>
                            </li>



                            <li className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                                <a
                                    onClick={() => {
                                        localStorage.removeItem("user")
                                        localStorage.removeItem("token")
                                        navigate('/')
                                    }}
                                >
                                    Logout
                                </a>
                            </li>


                        </ul>
                    </div>

                    <div className={`flex-1 justify-self-center  mt-3 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`} >
                        <ul>
                            <li className="text-gray-600 flex align-middle mt-3 hover:text-indigo-600 cursor-pointer">
                                <div className="relative">
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                        5
                                    </span>
                                    <a>
                                        <MdNotifications size={30} />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {!excelUpload && sendEmail && (
                <div className="">
                    <h5 className="text-xl font-bold mb-4  flex justify-center">Select One Template</h5>
                    <div className="grid grid-cols-2 gap-4 justify-center container">
                        {templates?.map((template, idx) => (
                            <div
                                key={idx}
                                className={`relative bg-white rounded-lg shadow-md p-6 ${selectedTemplate?.id === template.id ? 'border-blue-500 border-2' : ''
                                    }`}
                            >
                                <div className="template-content" dangerouslySetInnerHTML={{ __html: template.template }} />
                                <button
                                    className={`absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedTemplate?.id === template.id ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={() => handleTemplateSelection(template)}
                                    disabled={selectedTemplate?.id === template.id}
                                >
                                    {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedTemplate && !excelUpload && (
                <div className="flex justify-end mt-5 container">
                    <button
                        className="py-3 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md shadow"
                        onClick={() => {
                            if (selectedTemplate) {
                                setExcelUpload(true)
                            }
                        }}
                        disabled={!selectedTemplate}
                    >
                        Next
                    </button>
                </div>
            )}
            {excelUpload && (
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <input type="file" accept=".xlsx, .xls" onChange={(e: any) => {
                            console.log("🚀 ~ file: Homepage.tsx:50 ~ handleExcelUpload ~ e.target.files[0]", e.target.files[0])
                            setSelectedExcel(e.target.files[0])
                        }} />
                        <button
                            className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow mt-4"
                            onClick={(e: any) => {
                                handleExcelUpload();
                                if (selectedTemplate) {
                                    setExcelUpload(true);
                                }
                            }}
                            disabled={!selectedTemplate}
                        >
                            Upload Excel
                        </button>
                        <a
                            href="/path/to/excel/template"
                            className="mt-2 text-indigo-600 hover:text-indigo-800"
                            download
                        >
                            Download Excel Template
                        </a>
                    </div>
                </div>
            )}

        </>
    )
}
