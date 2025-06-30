import React, { useRef, useState } from 'react';
// 1. 导入真正正确的、为JS编写的库
import MsgReader from '@kenjiuno/msg-reader';

// 样式（保持不变）
const styles = {
    container: { fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', maxWidth: '800px', margin: '20px auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    button: { padding: '10px 15px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px' },
    previewArea: { marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' },
    error: { color: 'red', fontWeight: 'bold' },
    emailHeader: { marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' },
    emailHeaderField: { marginBottom: '8px' },
    label: { fontWeight: 'bold', marginRight: '8px' },
    emailBody: { marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '5px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '400px', overflowY: 'auto' },
    attachments: { marginTop: '20px' },
    attachmentList: { listStyleType: 'none', paddingLeft: '0' },
    attachmentItem: { background: '#f0f0f0', padding: '5px 10px', borderRadius: '4px', margin: '5px', display: 'inline-block', fontSize: '14px' },
};

const MsgFileViewer = () => {
    const fileInputRef = useRef(null);
    const [emailData, setEmailData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
        setEmailData(null);
        setError('');

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const fileBuffer = e.target.result; // 这是 ArrayBuffer
                
                // 2. 使用 @kenjiuno/msg-reader 的正确 API
                const msgReader = new MsgReader(fileBuffer);
                const fileData = msgReader.getFileData(); // 调用 getFileData() 方法
                
                console.log("【正确】解析后的数据:", fileData);
                setEmailData(fileData);

            } catch (err) {
                console.error("解析过程中发生错误:", err);
                setError('文件解析失败。请确保这是一个有效的 .msg 文件。');
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            setError('无法读取文件。');
            setIsLoading(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div style={styles.container}>
            <h2>.msg 邮件文件预览器 (最终验证版)</h2>
            <p>点击下方按钮选择一个 .msg 文件进行预览。</p>
            
            <input
                type="file"
                accept=".msg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            
            <button onClick={handleButtonClick} style={styles.button} disabled={isLoading}>
                {isLoading ? '正在解析...' : '选择 .msg 文件'}
            </button>

            {error && <p style={styles.error}>{error}</p>}
            
            {emailData && (
                <div style={styles.previewArea}>
                    {/* 3. 使用该库返回的正确数据结构进行渲染 */}
                    <div style={styles.emailHeader}>
                        <div style={styles.emailHeaderField}>
                            <span style={styles.label}>发件人:</span>
                            <span>{`${emailData.senderName} <${emailData.senderEmail}>`}</span>
                        </div>
                        <div style={styles.emailHeaderField}>
                            <span style={styles.label}>收件人:</span>
                            <span>{emailData.recipients?.map(r => r.name || r.email).join(', ')}</span>
                        </div>
                        <div style={styles.emailHeaderField}>
                            <span style={styles.label}>主题:</span>
                            <span>{emailData.subject}</span>
                        </div>
                        {emailData.messageDeliveryTime && (
                            <div style={styles.emailHeaderField}>
                                <span style={styles.label}>时间:</span>
                                <span>{new Date(emailData.messageDeliveryTime).toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    <h4>邮件正文:</h4>
                    {/* 该库的 'body' 字段是纯文本，使用 <pre> 标签可以保留换行和空格 */}
                    <pre style={styles.emailBody}>{emailData.body}</pre>

                    {emailData.attachments && emailData.attachments.length > 0 && (
                        <div style={styles.attachments}>
                            <h4>附件 ({emailData.attachments.length}):</h4>
                            <ul style={styles.attachmentList}>
                                {emailData.attachments.map((att) => (
                                    <li key={att.fileName} style={styles.attachmentItem}>
                                        📄 {att.fileName} ({Math.round(att.contentLength / 1024)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MsgFileViewer;