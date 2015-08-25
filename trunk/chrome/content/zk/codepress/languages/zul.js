/*
 * CodePress regular expressions for HTML syntax highlighting
 */

// HTML
Language.syntax = [
	{ input : /(&lt;[^!]*?&gt;)/g, output : '<b>$1</b>'	}, // all tags
	{ input : /(&lt;style.*?&gt;|&lt;\/style&gt;)/g, output : '<u>$1</u>' }, // style tags
	{ input : /(&lt;script.*?&gt;|&lt;\/script&gt;)/g, output : '<u>$1</u>' }, // script tags
	{ input : /(&lt;zscript.*?&gt;|&lt;\/zscript&gt;)/g, output : '<strong>$1</strong>' }, // zscript tags
	{ input : /(&lt;attribute.*?&gt;|&lt;\/attribute&gt;)/g, output : '<u>$1</u>' }, // attribute tags
	{ input : /(&lt;zk.*?&gt;|&lt;\/zk&gt;)/g, output : '<u>$1</u>' }, // root tags
	{ input : /(&lt;custom-attributes.*?&gt;|&lt;\/custom-attributes&gt;)/g, output : '<u>$1</u>' }, // custom-attributes tags
	{ input : /(&lt;variables.*?&gt;|&lt;\/variables&gt;)/g, output : '<u>$1</u>' }, // variables tags
	{ input : / ([^=|^\s]+)=(".*?"|'.*?')/g, output : ' <em>$1=</em><s>$2</s>' }, // atributes
	{ input : /=(".*?")/g, output : '=<s>$1</s>' }, // atributes double quote
	{ input : /=('.*?')/g, output : '=<s>$1</s>' }, // atributes single quote
	{ input : /(&lt;!--.*?--&gt.)/g, output : '<ins>$1</ins>' }, // comments 
	{ input : /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g, output : '<i>$1</i>'}, // reserved words
	{ input : /\b(AWTError|AWTEvent|AWTEventMulticaster|AWTException|AbstractMethodError|AccessException|Acl|AclEntry|AclNotFoundException|ActionEvent|ActionListener|Adjustable|AdjustmentEvent|AdjustmentListener|Adler32|AlreadyBoundException|Applet|AppletContext|AppletStub|AreaAveragingScaleFilter|ArithmeticException|Array|ArrayIndexOutOfBoundsException|ArrayStoreException|AudioClip|BeanDescriptor|BeanInfo|Beans|BigDecimal|BigInteger|BindException|BitSet|Boolean|BorderLayout|BreakIterator|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter|Button|ButtonPeer|Byte|ByteArrayInputStream|ByteArrayOutputStream|CRC32|Calendar|CallableStatement|Canvas|CanvasPeer|CardLayout|Certificate|CharArrayReader|CharArrayWriter|CharConversionException|Character|CharacterIterator|Checkbox|CheckboxGroup|CheckboxMenuItem|CheckboxMenuItemPeer|CheckboxPeer|CheckedInputStream|CheckedOutputStream|Checksum|Choice|ChoiceFormat|ChoicePeer|Class|ClassCastException|ClassCircularityError|ClassFormatError|ClassLoader|ClassNotFoundException|Clipboard|ClipboardOwner|CloneNotSupportedException|Cloneable|CollationElementIterator|CollationKey|Collator|Color|ColorModel|Compiler|Component|ComponentAdapter|ComponentEvent|ComponentListener|ComponentPeer|ConnectException|ConnectIOException|Connection|Constructor|Container|ContainerAdapter|ContainerEvent|ContainerListener|ContainerPeer|ContentHandler|ContentHandlerFactory|CropImageFilter|Cursor|Customizer|DGC|DSAKey|DSAKeyPairGenerator|DSAParams|DSAPrivateKey|DSAPublicKey|DataFlavor|DataFormatException|DataInput|DataInputStream|DataOutput|DataOutputStream|DataTruncation|DatabaseMetaData|DatagramPacket|DatagramSocket|DatagramSocketImpl|Date|DateFormat|DateFormatSymbols|DecimalFormat|DecimalFormatSymbols|Deflater|DeflaterOutputStream|Dialog|DialogPeer|Dictionary|DigestException|DigestInputStream|DigestOutputStream|Dimension|DirectColorModel|Double|Driver|DriverManager|DriverPropertyInfo|EOFException|EmptyStackException|Enumeration|Error|Event|EventListener|EventObject|EventQueue|EventSetDescriptor|Exception|ExceptionInInitializerError|ExportException|FeatureDescriptor|Field|FieldPosition|File|FileDescriptor|FileDialog|FileDialogPeer|FileInputStream|FileNameMap|FileNotFoundException|FileOutputStream|FileReader|FileWriter|FilenameFilter|FilterInputStream|FilterOutputStream|FilterReader|FilterWriter|FilteredImageSource|Float|FlowLayout|FocusAdapter|FocusEvent|FocusListener|Font|FontMetrics|FontPeer|Format|Frame|FramePeer|GZIPInputStream|GZIPOutputStream|Graphics|GregorianCalendar|GridBagConstraints|GridBagLayout|GridLayout|Group|Hashtable|HttpURLConnection|IOException|Identity|IdentityScope|IllegalAccessError|IllegalAccessException|IllegalArgumentException|IllegalComponentStateException|IllegalMonitorStateException|IllegalStateException|IllegalThreadStateException|Image|ImageConsumer|ImageFilter|ImageObserver|ImageProducer|IncompatibleClassChangeError|IndexColorModel|IndexOutOfBoundsException|IndexedPropertyDescriptor|InetAddress|Inflater|InflaterInputStream|InputEvent|InputStream|InputStreamReader|Insets|InstantiationError|InstantiationException|Integer|InternalError|InterruptedException|InterruptedIOException|IntrospectionException|Introspector|InvalidClassException|InvalidKeyException|InvalidObjectException|InvalidParameterException|InvocationTargetException|ItemEvent|ItemListener|ItemSelectable|Key|KeyAdapter|KeyEvent|KeyException|KeyListener|KeyManagementException|KeyPair|KeyPairGenerator|Label|LabelPeer|LastOwnerException|LayoutManager|LayoutManager2|Lease|LightweightPeer|LineNumberInputStream|LineNumberReader|LinkageError|List|ListPeer|ListResourceBundle|LoaderHandler|Locale|LocateRegistry|LogStream|Long|MalformedURLException|MarshalException|Math|MediaTracker|Member|MemoryImageSource|Menu|MenuBar|MenuBarPeer|MenuComponent|MenuComponentPeer|MenuContainer|MenuItem|MenuItemPeer|MenuPeer|MenuShortcut|MessageDigest|MessageFormat|Method|MethodDescriptor|MissingResourceException|Modifier|MouseAdapter|MouseEvent|MouseListener|MouseMotionAdapter|MouseMotionListener|MulticastSocket|Naming|NegativeArraySize|Exception|NoClassDefFoundError|NoRouteToHostException|NoSuchAlgorithmException|NoSuchElementException|NoSuchFieldError|NoSuchFieldException|NoSuchMethodError|NoSuchMethodException|NoSuchObjectException|NoSuchProviderException|NotActiveException|NotBoundException|NotOwnerException|NotSerializableException|NullPointerException|Number|NumberFormat|NumberFormatException|ObjID|Object|ObjectInput|ObjectInputStream|ObjectInputValidation|ObjectOutput|ObjectOutputStream|ObjectStreamClass|ObjectStreamException|Observable|Observer|Operation|OptionalDataException|OutOfMemoryError|OutputStream|OutputStreamWriter|Owner|PaintEvent|Panel|PanelPeer|ParameterDescriptor|ParseException|ParsePosition|Permission|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter|PixelGrabber|Point|Polygon|PopupMenu|PopupMenuPeer|PreparedStatement|Principal|PrintGraphics|PrintJob|PrintStream|PrintWriter|PrivateKey|Process|Properties|PropertyChangeEvent|PropertyChangeListener|PropertyChangeSupport|PropertyDescriptor|PropertyEditor|PropertyEditorManager|PropertyEditorSupport|PropertyResourceBundle|PropertyVetoException|ProtocolException|Provider|ProviderException|PublicKey|PushbackInputStream|PushbackReader|RGBImageFilter|RMIClassLoader|RMIFailureHandler|RMISecurityException|RMISecurityManager|RMISocketFactory|Random|RandomAccessFile|Reader|Rectangle|Registry|RegistryHandler|Remote|RemoteCall|RemoteException|RemoteObject|RemoteRef|RemoteServer|RemoteStub|ReplicateScaleFilter|ResourceBundle|ResultSet|ResultSetMetaData|RuleBasedCollator|Runnable|Runtime|RuntimeException|SQLException|SQLWarning|ScrollPane|ScrollPanePeer|Scrollbar|ScrollbarPeer|SecureRandom|Security|SecurityException|SecurityManager|SequenceInputStream|Serializable|ServerCloneException|ServerError|ServerException|ServerNotActiveException|ServerRef|ServerRuntimeException|ServerSocket|Shape|Short|Signature|SignatureException|Signer|SimpleBeanInfo|SimpleDateFormat|SimpleTimeZone|Skeleton|SkeletonMismatchException|SkeletonNotFoundException|Socket|SocketException|SocketImpl|SocketImplFactory|SocketSecurityException|Stack|StackOverflowError|Statement|StreamCorruptedException|StreamTokenizer|String|StringBuffer|StringBufferInputStream|StringCharacterIterator|StringIndexOutOfBoundsException|StringReader|StringSelection|StringTokenizer|StringWriter|StubNotFoundException|SyncFailedException|System|SystemColor|TextArea|TextAreaPeer|TextComponent|TextComponentPeer|TextEvent|TextField|TextFieldPeer|TextListener|Thread|ThreadDeath|ThreadGroup|Throwable|Time|TimeZone|Timestamp|TooManyListenersException|Toolkit|Transferable|Types|UID|URL|URLConnection|URLEncoder|URLStreamHandler|URLStreamHandlerFactory|UTFDataFormatException|UnexpectedException|UnicastRemoteObject|UnknownError|UnknownHostException|UnknownServiceException|UnmarshalException|Unreferenced|UnsatisfiedLinkError|UnsupportedEncodingException|UnsupportedFlavorException|VMID|Vector|VerifyError|VetoableChangeListener|VetoableChangeSupport|VirtualMachineError|Visibility|Void|Window|WindowAdapter|WindowEvent|WindowListener|WindowPeer|WriteAbortedException|Writer|ZipEntry|ZipException|ZipFile|ZipInputStream|ZipOutputStream)\b/g, output : '<em>$1</em>'}, // keyword words
	{ input : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, output : '$1<i>//$2</i>$3'}, // comments //	
	{ input : /\/\*(.*?)\*\//g, output : '<i>/*$1*/</i>' }// comments /* */
]

Language.snippets = [
	{ input : 'aref', output : '<a href="$0"></a>' },
	{ input : 'h1', output : '<h1>$0</h1>' },
	{ input : 'h2', output : '<h2>$0</h2>' },
	{ input : 'h3', output : '<h3>$0</h3>' },
	{ input : 'h4', output : '<h4>$0</h4>' },
	{ input : 'h5', output : '<h5>$0</h5>' },
	{ input : 'h6', output : '<h6>$0</h6>' },
	{ input : 'html', output : '<html>\n\t$0\n</html>' },
	{ input : 'head', output : '<head>\n\t<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n\t<title>$0</title>\n\t\n</head>' },
	{ input : 'img', output : '<img src="$0" alt="" />' },
	{ input : 'input', output : '<input name="$0" id="" type="" value="" />' },
	{ input : 'label', output : '<label for="$0"></label>' },
	{ input : 'legend', output : '<legend>\n\t$0\n</legend>' },
	{ input : 'link', output : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },		
	{ input : 'base', output : '<base href="$0" />' }, 
	{ input : 'body', output : '<body>\n\t$0\n</body>' }, 
	{ input : 'css', output : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },
	{ input : 'div', output : '<div>\n\t$0\n</div>' },
	{ input : 'divid', output : '<div id="$0">\n\t\n</div>' },
	{ input : 'dl', output : '<dl>\n\t<dt>\n\t\t$0\n\t</dt>\n\t<dd></dd>\n</dl>' },
	{ input : 'fieldset', output : '<fieldset>\n\t$0\n</fieldset>' },
	{ input : 'form', output : '<form action="$0" method="" name="">\n\t\n</form>' },
	{ input : 'meta', output : '<meta name="$0" content="" />' },
	{ input : 'p', output : '<p>$0</p>' },
	{ input : 'script', output : '<script type="text/javascript" language="javascript" charset="utf-8">\n\t$0\t\n</script>' },
	{ input : 'scriptsrc', output : '<script src="$0" type="text/javascript" language="javascript" charset="utf-8"></script>' },
	{ input : 'span', output : '<span>$0</span>' },
	{ input : 'table', output : '<table border="$0" cellspacing="" cellpadding="">\n\t<tr><th></th></tr>\n\t<tr><td></td></tr>\n</table>' },
	{ input : 'style', output : '<style type="text/css" media="screen">\n\t$0\n</style>' }
]
	
Language.complete = [
	{ input : '\'',output : '\'$0\'' },
	{ input : '"', output : '"$0"' },
	{ input : '(', output : '\($0\)' },
	{ input : '[', output : '\[$0\]' }/**,
	{ input : '{', output : '{\n\t$0\n}' }	*/
]

Language.shortcuts = []
