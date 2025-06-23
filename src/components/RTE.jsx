import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({name,control , label }) => {
  return (
    <div className='w-full'>
      {label && <label className='test-sm text-gray-600'>{label}</label>}
      <Controller
      name={name || "content"}
      control={control}
      render={({field:{onChange}})=>(
        <Editor
        initialValue='<p>whats in your mind</p>'
        init={{
          height:500,
          menubar:true,
          plugins:[
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onchange}
        />
      )}
      
      /> 
    </div>
  )
  
}

export default RTE