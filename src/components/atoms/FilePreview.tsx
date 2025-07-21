type FilePreviewProps = {
    fileUrl: string;
    editPreview: boolean;
}

export default function FilePreview({ fileUrl, editPreview }: FilePreviewProps) {
  const mediaStyle = {
    width: 'auto',
    maxHeight: editPreview ? 250 : '100%',
    maxWidth: editPreview ? 400 : '100%',
    borderRadius: 20,
    border: '1px solid #ccc',
  };

  return (
    fileUrl.endsWith('.mp4') ? (
      <video
        src={fileUrl}
        style={mediaStyle}
        controls={editPreview}
        autoPlay={!editPreview}
        muted
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={fileUrl} alt="Link Content" style={mediaStyle} />
    )
  );
}
